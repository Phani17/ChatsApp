var expect=require('expect');
const {isRealString}=require('./validation');

describe('isRealString',()=>{
  it('should reject nonstring values',()=>{
    var res=isRealString(98);
    expect(res).toBe(false);
  });
  it('should reject string with only spaces',()=>{
    var res=isRealString('  ');
    expect(res).toBe(false);
  });

  it('should allow string vwith non space values',()=>{
    var res=isRealString(' Andres ');
    expect(res).toBe(true);
  });
});
