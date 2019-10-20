export class Signature {
  signature: bigint = BigInt(0);

  constructor(signature: bigint = BigInt(0)) {
    this.signature = signature;
  }

  set(bitField: bigint) {
    this.signature |= bitField;
  }

  is(bitField: bigint | Signature) {
    bitField = bitField instanceof Signature ? bitField.signature : bitField;

    return Boolean((this.signature & bitField) === bitField);
  }

  has(bitField: bigint | Signature) {
    bitField = bitField instanceof Signature ? bitField.signature : bitField;

    return Boolean(this.signature & bitField);
  }

  unset(bitField: bigint) {
    this.signature &= ~bitField;
  }

  reset() {
    this.signature = BigInt(0);
  }
}
