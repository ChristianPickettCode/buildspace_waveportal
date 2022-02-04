const main = async () => {
  const [owner, rP0, rP1, rP2, rP3, rP4, rP5] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // let waveCount;
  // waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  let waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // waveCount = await waveContract.getTotalWaves();

  // const rPs = [rP0, rP1, rP2, rP3, rP4, rP5];

  // for (const i in rPs) {
  //   waveTxn = await waveContract
  //     .connect(rPs[i])
  //     .wave(`${i} wave from ${rPs[i].address}`);
  //   await waveTxn.wait();
  // }

  // waveCount = await waveContract.getTotalWaves();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
