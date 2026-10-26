import { Field, UInt64, Struct, ZkProgram, Cache, verify, setNumberOfWorkers } from 'o1js';
import { createHash } from 'node:crypto';

setNumberOfWorkers(2);
export class Reservation extends Struct({
  before: UInt64, after: UInt64, units: UInt64,
  version: UInt64, nextVersion: UInt64, domain: Field, action: Field
}) {}

export const ReservationProgram = ZkProgram({
  name: 'aaif-reservation-v1', publicInput: Reservation,
  methods: {
    reserve: {
      privateInputs: [],
      async method(t) {
        t.units.greaterThan(UInt64.zero).assertTrue();
        t.before.sub(t.units).assertEquals(t.after);
        t.version.add(1).assertEquals(t.nextVersion);
      }
    }
  }
});

const field = value => Field(BigInt('0x' + createHash('sha256').update(String(value)).digest('hex')) % Field.ORDER);
let compiled;
export async function verifyReceiptProof(proof, expected, verificationKeyData) {
  if (!proof) return false;
  const wanted = new Reservation({
    before: UInt64.from(expected.before), after: UInt64.from(expected.before - expected.units), units: UInt64.from(expected.units),
    version: UInt64.from(expected.version), nextVersion: UInt64.from(expected.version + 1),
    domain: field(expected.domain), action: field(expected.action)
  });
  if (JSON.stringify(proof.publicInput) !== JSON.stringify(Reservation.toFields(wanted).map(String))) return false;
  try { return await verify(proof, verificationKeyData); } catch { return false; }
}

export async function proofBackend() {
  compiled ??= ReservationProgram.compile({ cache: Cache.FileSystem('.cache/o1js') });
  const { verificationKey } = await compiled;
  return {
    verificationKey,
    evidence: 'local-o1js-application-proof',
    async prove({ before, units, version, domain, action }) {
      const input = new Reservation({
        before: UInt64.from(before), after: UInt64.from(before - units), units: UInt64.from(units),
        version: UInt64.from(version), nextVersion: UInt64.from(version + 1), domain: field(domain), action: field(action)
      });
      const { proof } = await ReservationProgram.reserve(input);
      return proof.toJSON();
    },
    async check(proof, expected) {
      return verifyReceiptProof(proof, expected, verificationKey.data);
    }
  };
}
