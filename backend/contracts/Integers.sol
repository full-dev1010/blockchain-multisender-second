pragma solidity ^0.4.24;

/**
 * Integers Library
 * 
 * In summary this is a simple library of integer functions which allow a simple
 * conversion to and from strings
 * 
 * @author James Lockhart <james@n3tw0rk.co.uk>
 */
library Integers {
    /**
     * Parse Int
     * 
     * Converts an ASCII string value into an uint as long as the string 
     * its self is a valid unsigned integer
     * 
     * @param _value The ASCII string to be converted to an unsigned integer
     * @return uint The unsigned value of the ASCII string
     */
    function parseInt(string memory _value)
        public
        pure
        returns (uint256 _ret) {
        bytes memory _bytesValue = bytes(_value);
        uint256 j = 1;
        _ret = 0;
        for(uint i = _bytesValue.length-1; i >= 0 && i < _bytesValue.length; i--) {
            assert(uint8(_bytesValue[i]) >= 48 && uint8(_bytesValue[i]) <= 57);
            _ret += (uint8(_bytesValue[i]) - 48) * j;
            j *= 10;
        }
    }
    
}