module.exports = {
    isInteger : function(any){
        return typeof any === 'number' && any % 1 === 0;
    }    
};

