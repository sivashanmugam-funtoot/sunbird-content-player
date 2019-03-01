//@ sourceURL=additioneval.js
/**
 * Reusable addition evaluator - used for both Vertical and Horizontal evaluations
 * @author Henrietta D (henrietta.d@funtoot.com)
 * @author Amulya K (amulya.k@funtoot.com)
 */
/**
 * Constructs the AdditionEval object
 * @constructor
 */
function AdditionEval(model) {
    this.model = model;
}

AdditionEval.prototype.evaluate = function (model) {
    //check if user answers are correct
    if (isCorrect(model))
        return true;
    var strategy = getEvalStrategy(model);
    for (i = 0; i < strategy.length; i++) {
        var result = ruleSet[strategy[i]](model);
        if (result != true)
            return result;
    }
    return true;
}

/**
 * @todo use pipeline pattern instead of this.
 */
var ruleSet = {
    isSingleDigitSameNumber: isSingleDigitSameNumber,
    isSingleDigitDefault: isSingleDigitDefault,
    isMultiplesOfHundreds: isMultiplesOfHundreds,
    isReverseCarry: isReverseCarry,
    isCarryMissing: isCarryMissing,
    isReverseAddition: isReverseAddition,
    isCarryInAnswerBox: isCarryInAnswerBox,
    isSumOfIndividualDigits: isSumOfIndividualDigits,
    joinNumbers: joinNumbers,
}

function getEvalStrategy(model) {
    model.opLength = [];
    model.operands.forEach(function (o, i, a) {
        model.opLength.push(o.toString().length);
    });
    var singleDigit = _.every(model.opLength, function (l) { return l == 1; });
    var evalRuleSet = [];
    if (singleDigit)
        evalRuleSet = ["isSingleDigitSameNumber", "isReverseCarry", "isCarryMissing", "isSingleDigitDefault"];
    else
        evalRuleSet = ["isMultiplesOfHundreds", "isReverseCarry", "isCarryMissing", "isReverseAddition", "isCarryInAnswerBox", "isSumOfIndividualDigits", "joinNumbers"];
    return evalRuleSet;
}
/**
 * Checks if all digits are same, if all digits are same then checks if user answer is same as expected answer,
 * if not return a model indicating error
 * @param {object} model
 * @returns {object} model
 */
var isSingleDigitSameNumber = function (model) {
    //Check if all operands are same
    for (i = 0; i < model.operands.length; i++) {
        if (model.operands[i] !== model.operands[0])
            return true;
    }
    if (Number(model.expected.answer) !== Number(model.user.answer))
        return result = {
            id: "isSingleDigitSameNumber",
            context: [{
                location: "ans",
                index: null
            }]
        }
    else
        return true;
}
/**
 * Checks if user answer is same as expected answer, if not return a model indicating error
 * @param {object} model
 * @returns {object} model
 */
var isSingleDigitDefault = function (model) {
    if (Number(model.expected.answer) !== Number(model.user.answer))
        return result = {
            id: "isSingleDigitDefault",
            context: [{
                location: "ans",
                index: null
            }]
        }
    else
        return true;
}
/**
 * Checks if all numbers are multiples of 100, if so then checks if user answer is same as expected answer,
 * if not return a model indicating error
 * @param {object} model
 * @returns {object} model
 */
var isMultiplesOfHundreds = function (model) {
    var operandsMultipleof100s = _.every(model.operands, function (o) { return o % 100 == 0; });
    if (operandsMultipleof100s && Number(model.expected.answer) !== Number(model.user.answer))
        return result = {
            id: "isMultiplesOfHundreds",
            context: [{
                location: "ans",
                index: null
            }]
        }
    else
        return true;
}
var isReverseCarry = function (model) {
    return true;/* result = {
        id: "isReverseCarry",
        context: [{
            location: "ans",
            index: null
        }]
    }
    console.log("isReverseCarry");*/
}
var isCarryMissing = function (model) {
    return true; /*result = {
        id: "isCarryMissing",
        context: [{
            location: "ans",
            index: null
        }]
    }
    console.log("isCarryMissing");*/
}
var isReverseAddition = function (model) {
    return true;/*result = {
        id: "isReverseAddition",
        context: [{
            location: "ans",
            index: null
        }]
    }
    console.log("isReverseAddition");*/
}
var isCarryInAnswerBox = function (model) {
    return true;/*result = {
        id: "isCarryInAnswerBox",
        context: [{
            location: "ans",
            index: null
        }]
    }
    console.log("isCarryInAnswerBox");*/
}
/**
 * Checks if user answers is sum of all individual digits, if so return a model indicating error
 * @param {object} model
 * @returns {object} model
 */
var isSumOfIndividualDigits = function (model) {
    var numberString = ""
    //conact all the operands
    var array = [];
    _.map(model.operands, function (op) {
        var a = _.toArray(op.toString());
        array.push(a.join().replace(/,/g, '+'));
    });
    var individualDigitSum = eval(array.join().replace(/,/g, '+'));
    if (Number(model.user.answer) === individualDigitSum)
        return result = {
            id: "isSumOfIndividualDigits",
            context: [{
                location: "ans",
                index: null
            }]
        }
    else
        return true;
}
/**
 * Checks if user answers is just concatenation of numbers , if so return a model indicating error
 * @param {object} model
 * @returns {object} model
 */
var joinNumbers = function (model) {
    var concatedNumbers = ""
    //conact all the operands
    _.each(model.operands, function (o) {
        concatedNumbers = concatedNumbers + o.toString();
    })
    if (Number(model.user.answer) === Number(concatedNumbers))
        return result = {
            id: "joinNumbers",
            context: [{
                location: "ans",
                index: null
            }]
        }
    else
        return true;
}
/**
 * Check if user answers(sum/difference, carry/borrow) are correct
 * @param {Object} model
 * @param {boolean} 
 */
var isCorrect = function (model) {
    var isAnsCorrect = false;
    var isCarryBorrowCorrect = false;
    // Check is sum/ difference is correct
    if (Number(model.expected.answer) != Number(model.user.answer))
        return false
    else {
        isAnsCorrect = true;
        if (model.operation = 'Addition')
            isCarryBorrowCorrect = isCarryOrBorrowCorrect(model.expected.carry, model.user.carry);
        else
            isCarryBorrowCorrect = isCarryOrBorrowCorrect(model.expected.borrow, model.user.borrow);
    }
    if (isAnsCorrect && isCarryBorrowCorrect)
        return true;
    else
        return false
}
/**
 * Check if user carry/borrow is correct
 * @param {array} expectedCarryBorrow
 * @param {array} userCarryBorrow
 */
var isCarryOrBorrowCorrect = function (expectedCarryBorrow, userCarryBorrow) {
    if (!userCarryBorrow) {
        //user has not entered anything in carry/borrow field
        return true;
    }
    else {//user has entered carry/borrow
        if (expectedCarryBorrow) {
            //if there is expected carry/borrow
            if (expectedCarryBorrow.length == userCarryBorrow.length) {
                //if there are same number of carry/borrow digits in expected and user entered carry/borrow
                var boolArray = []
                for (i = 0; i < expectedCarryBorrow.length; i++) {
                    //comparing each element in expected carry/borrow and user borrow and update boolArray accordingly
                    if (expectedCarryBorrow[i] == userCarryBorrow[i])
                        boolArray.push(true);
                    else
                        boolArray.push(false);
                }
                return _.every(boolArray, function (a) { return a == true; });
            }
            else
                return false
        }
        else
            return false;
    }
}
