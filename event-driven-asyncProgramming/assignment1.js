// write a function delayLog that loops through the numbers from 1 to 10, and logs each
// number after that numberof seconds. So 1 should be logged after 1 second,
// 2 after 2 seconds, etc.

const delayLog = () => {
  for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log(`${i} second${i < 2 ? '': 's'} later`)
    }, i * 1000);
  };
};

delayLog();
