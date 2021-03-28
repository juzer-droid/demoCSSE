import SHA256 from 'crypto-js/sha256.js';

//defining the order of the block
class Block{
    constructor (index, timestamp, data, pHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.pHash = pHash;
        this.hash = this.calculatehash();

    }

    calculatehash(){
        return SHA256(this.index + this.pHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


//creating a new blockchain.
class  Ledger{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block (0, "11/12/2020", "Genesis block", "0" );
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.pHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculatehash();
        newBlock.getDataForm = 
        this.chain.push(newBlock);
    }

    /*isChainValid (){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash != currentBlock.calculatehash()){
                return false;
            }

            if (currentBlock.previousBlock != previousBlock.hash){
                return false;
            }
        }

        return true;
    }*/
}
//adding new blocks with data to the blockchain
let BlockchainDemo = new Ledger();
BlockchainDemo.addBlock(new Block (1, "28/03/2021", "Name: Juzer, Age: 22, Presiding Doctor: Dr Ali hussein, Previous medication: None, Current ailments: Anxiety ADHD"));


console.log (JSON.stringify(BlockchainDemo, null, 4));