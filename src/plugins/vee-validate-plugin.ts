import { extend } from 'vee-validate';
import * as rules from "vee-validate/dist/rules";

for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}
