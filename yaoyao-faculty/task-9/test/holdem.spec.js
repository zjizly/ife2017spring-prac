import chai from 'chai';
import Holdem from '../lib/holdem';

let expect = chai.expect;
const computeLevel = Holdem.computeLevel;

describe.only('lib/holdem#computeLevel', () => {
    // tools
    const createPokers = function (valList, typeList, messIt = true) {
        let ret = valList.map( (v, i) => { 
            return { v, t: typeList[i] }; 
        });
        if (messIt) {
            const tmp = ret;
            ret = [];
            do {
                let i = Math.random() * (tmp.length - 1);
                i = Math.floor(i);
                ret.push(tmp[i]);
                tmp.splice(i, 1);
            } while (tmp.length);
        }
        return ret;
    };
    const pokersDeepEql = function (a, b) {
        let res = true;

        if (a.length === b.length) {
            const len = a.length;            
            for (let i = 0; i < len; i++) {
                if (res) {
                    let vEql = a[i].v === b[i].v;
                    let tEql = a[i].t === b[i].t;
                    res = vEql && tEql; 
                } else {
                    break;
                }
            }
        } else {
            res = false;
        }

        return res;
    };

    const tests = [
        /* Straight Flush */
        // input len is 5
        { args: [[2, 3, 4, 5, 6], [0, 0, 0, 0, 0]],     expected: [8, [2, 3, 4, 5, 6], [0, 0, 0, 0, 0]] },
        { args: [[0, 1, 2, 3, 4], [2, 2, 2, 2, 2]],     expected: [8, [0, 1, 2, 3, 4], [2, 2, 2, 2, 2]] },
        { args: [[8, 9, 10, 11, 12], [1, 1, 1, 1, 1]],  expected: [8, [8, 9, 10, 11, 12], [1, 1, 1, 1, 1]] },
        { args: [[0, 9, 10, 11, 12], [3, 3, 3, 3, 3]],  expected: [8, [9, 10, 11, 12, 0], [3, 3, 3, 3, 3]] },
        // input len is 6
        { args: [[2, 3, 4, 5, 6, 7], [1, 0, 0, 0, 0, 0]],     expected: [8, [3, 4, 5, 6, 7], [0, 0, 0, 0, 0]] },
        { args: [[0, 1, 2, 3, 4, 5], [3, 2, 2, 2, 2, 2]],     expected: [8, [1, 2, 3, 4, 5], [2, 2, 2, 2, 2]] },
        { args: [[7, 8, 9, 10, 11, 12], [1, 1, 1, 1, 1, 0]],  expected: [8, [7, 8, 9, 10, 11], [1, 1, 1, 1, 1]] },
        { args: [[0, 2, 9, 10, 11, 12], [3, 2, 3, 3, 3, 3]],  expected: [8, [9, 10, 11, 12, 0], [3, 3, 3, 3, 3]] },        
        // input len is 7
        { args: [[2, 3, 4, 5, 6, 7, 8], [1, 0, 0, 0, 0, 0, 1]],     expected: [8, [3, 4, 5, 6, 7], [0, 0, 0, 0, 0]] },
        { args: [[0, 1, 2, 3, 4, 5, 6], [3, 3, 2, 2, 2, 2, 2]],     expected: [8, [2, 3, 4, 5, 6], [2, 2, 2, 2, 2]] },
        { args: [[6, 7, 8, 9, 10, 11, 12], [1, 1, 1, 1, 1, 0, 0]],  expected: [8, [6, 7, 8, 9, 10], [1, 1, 1, 1, 1]] },
        { args: [[0, 2, 8, 9, 10, 11, 12], [3, 0, 0, 3, 3, 3, 3]],  expected: [8, [9, 10, 11, 12, 0], [3, 3, 3, 3, 3]] },  

        /* Four of a kind */
        // input len is 5
        { args: [[1, 9, 9, 9, 9], [1, 0, 1, 2, 3]],  expected: [7, [9, 9, 9, 9, 1], [0, 1, 2, 3, 1]] },
        { args: [[0, 0, 0, 0, 9], [0, 1, 2, 3, 0]],     expected: [7, [0, 0, 0, 0, 9], [0, 1, 2, 3, 0]] },
        { args: [[8, 12, 12, 12, 12], [1, 0, 1, 2, 3]],  expected: [7, [12, 12, 12, 12, 8], [0, 1, 2, 3, 1]] },
        // input len is 6 
    ];
    tests.forEach(function(test) {
        let desc = `input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = createPokers(test.args[0], test.args[1]);
            let output = createPokers(test.expected[1], test.expected[2], false);
            let res = computeLevel(input);
            console.log(res);
            expect(res.level === test.expected[0] && pokersDeepEql(res.pokers, output)).to.be.true;
        });
    });
});