import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: faker.lorem.sentence,
  isComplete: faker.random.boolean
});
