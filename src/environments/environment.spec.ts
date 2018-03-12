import {environment} from './environment';


// the idea here is: we hack up things to get dev like unit, so we can see how things work while writing the tests,
// but then you worry about leaving them that way. This way you can track that (the overall tests will fail), and you won't
// run them until you're done testing right? So done... run overall tests, then reminded what you need to revert. This will work
// at work? Only if you don't check it in, which you shouldn't right. All unit tests should be running before you PR
describe('environment tests', () => {
  const env = environment;

  it('should have animations turned on', () => {
    expect(env.disableAnimations).toBeFalsy();
  });

});

