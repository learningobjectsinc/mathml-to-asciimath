var trim = require('trim');

var miToAsciiMath = {
    '&alpha;'   : 'alpha',
    '&beta;'    : 'beta',
    '&chi;'     : 'chi',
    '&delta;'   : 'delta',
    '&epsilon;' : 'epsi',
    '&eta;'     : 'eta',
    '&gamma;'   : 'gamma',
    '&iota;'    : 'iota',
    '&kappa;'   : 'kappa',
    '&lambda;'  : 'lambda',
    '&mu;'      : 'mu',
    '&nu;'      : 'nu',
    '&omega;'   : 'omega',
    '&phi;'     : 'phi',
    '&pi;'      : 'pi',
    '&psi;'     : 'psi',
    '&rho;'     : 'rho',
    '&sigma;'   : 'sigma',
    '&tau;'     : 'tau',
    '&theta;'   : 'theta',
    '&upsilon;' : 'upsilon',
    '&xi;'      : 'xi',
    '&zeta;'    : 'zeta'
};

module.exports = function init() {
  return function handle(element, buffer) {
    var value = trim(element.val);

    buffer.push(miToAsciiMath[value] || value);
  };
};
