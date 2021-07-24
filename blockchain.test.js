const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let blockchain;
  let newChain;
  let originalChain;

  beforeEach(() => {
    newChain= new Blockchain();
    blockchain = new Blockchain();
    originalChain=blockchain.chain;

  });
  it('contains a `chain` Array Instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const newData = 'foo bar';
    blockchain.addBlock({
      data: newData
    });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe('isValidChain()', () => {
    describe('when the chain doesnt start with the geesis block', () => {
      it('returns false', () => {
        blockchain.chain[0] = {
          data: 'fake-genesis'
        };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });
    describe('when the chain start with the geesis block', () => {
      describe('and a lastHash reference has changed', () => {
        it('returns false', () => {
          blockchain.addBlock({
            data: 'Bears'
          });
          blockchain.addBlock({
            data: 'Beets'
          });
          blockchain.addBlock({
            data: 'Balls'
          });
          blockchain.chain[2].lastHash = 'fake-hash';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe('and the chain contains a block with an invalid feild', () => {
        it('returns false', () => {
          blockchain.addBlock({
            data: 'Bears'
          });
          blockchain.addBlock({
            data: 'Beets'
          });
          blockchain.addBlock({
            data: 'Balls'
          });
          blockchain.chain[2].lastHash = 'fake-hash';
          blockchain.chain[2].data = "fake data";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

        });
      });
      describe('and the chain doesnr contain invalid block', () => {
        it('returns true', () => {
          blockchain.addBlock({
            data: 'Bears'
          });
          blockchain.addBlock({
            data: 'Beets'
          });
          blockchain.addBlock({
            data: 'Balls'
          });
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
  describe('replacement()',()=>{


    describe('new chain is not longer',()=>{
      it('doesnt replace the chain',()=>{
        newChain.chain[0]={new:'chain'};
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });
    describe('new chain is longer',()=>{
      beforeEach(()=>{
        newChain.addBlock({
          data: 'Bears'
        });
        newChain.addBlock({
          data: 'Beets'
        });
        newChain.addBlock({
          data: 'Balls'
        });
      });

      describe('and the chain invalid',()=>{
      it('doesnt replace the chain',()=>{

        newChain.chain[2].hash='some fake hash';
        blockchain.replaceChain(newChain.chain);
      });
      expect(Blockchain.chain).toEqual(originalChain);
    });
       describe('and the chain is valid',()=>{
         it('does replace the chain',()=>{
           blockchain.replaceChain(newChain.chain);
           expect(blockchain.chain).toEqual(newChain.chain);
         });
       });
      });
  });
  });
