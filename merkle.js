const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");
const { EOL } = require("os");

const [encoding, ...leafs]=fs
.readFileSync("genesis.csv", "utf-8")
.trim()
.split("\n");

const tree = StandardMerkleTree.of(
	leafs.map((leaf) => leaf.split(",")),
	encoding.split(",")
);

for (const [i, v] of tree.entries()) {
    const proof = tree.getProof(i);
    data = "to: " + v[0].toString()+"\n";
    data = data + "value: " + v[1].toString()+"\n";
    data = data + "proof: " + JSON.stringify(proof).replace(/"/g,'')+"\n\n";
	fs.appendFileSync('proofs.txt',data);
}

console.log('Merkle Root:', tree.root);
