
const Block = require('./block');
const {
  GENESIS_DATA
} = require('./config.js');
const cryptoHash=require('./crypto-hash');

describe('Block', () => {
      const timestamp = 'a-date';
      const lastHash = 'foo-hash';
      const hash = 'bar-hash';
      const data = ['blockchain', 'data'];

      const block = new Block({
        timestamp,
        lastHash,
        hash,
        data
      });
      it('has a timestamp,lastHash,hash,and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
      });

      describe('genesis()', () => {
        const genesisBlock = Block.genesis();
        it('returns a block instance', () => {
          expect(genesisBlock instanceof Block).toBe(true);
        });
        it('returns a block data', () => {
          expect(genesisBlock).toEqual(GENESIS_DATA);
        });

  });
  describe("mineBlock()",()=>{
    const lastBlock= Block.genesis();
    const data = 'any data';
    const minedBlock= Block.mineBlock({lastBlock,data})
    if("returns a Block instance",()=>{
      expect(genesisBlock instanceof Block).toBe(true);
    });
    it("sets the `lastHash` to be the `hash` of the lastBlock",()=>{
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });
    it("set the `data`",()=>{
      expect(minedBlock.data).toEqual(data);
    });
    it("set the `timestamp`",()=>{
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
    it("creats a SHA256 based on the proper input", ()=>{
      expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash ,data));
    });
  });
});
