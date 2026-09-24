const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
test('Waline allows its custom management domain without opening all origins',()=>{
  let config;
  vm.runInNewContext(fs.readFileSync('services/waline/index.cjs','utf8'),{
    require: name=>name==='@waline/vercel' ? options=>{config=options;return ()=>{};} : ()=>'',
    process:{env:{}},global:{think:{logger:{getLogger:()=>({})}}},module:{exports:{}},
  });
  assert.ok(config.secureDomains.includes('comments.starrydome.top'));
  assert.ok(config.secureDomains.includes('starrydome.top'));
  assert.ok(!config.secureDomains.includes('*'));
});
