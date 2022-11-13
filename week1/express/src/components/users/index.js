

function findAll() {
        return users || [];
    }


    function findById(id) {
        return Number(id) && Number(id) > 0 ? users.filter(item => item.id ===  Number(id)) : [];
    }


    function update(id, props) {
        return [];
    }

    function deleteById(id) {


        return Number(id) && Number(id) > 0 ? users.filter(item => item.id ===  Number(id)) : [];
    }

   function create() {
        return {
            message: 'Created',
        };
    }



module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
};