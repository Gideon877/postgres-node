module.exports = function(pool) {

    const users = async (req, res, next) => {
        const users = await pool.query('select * from system_user');
        res.send({users: users.rows});
    };

    const getUser = async (req, res, next) => {
        const { id } = req.params;
        const user = await pool.query('select * from system_user where id = $1', [id]);
        res.send({user: user.rows})
    }

    const addUser = async (req, res, next) => {
        const { firstName, lastName, username } = req.body;
        const sql = 'insert into system_user (first_name, last_name, username) values ($1, $2, $3)'
        await pool.query(sql, [firstName, lastName, username]);
        res.send({status: 200});
    }



    /** bookings */

    const findBookings = async (req, res, next) => {
        const bookings = await pool.query('select * from booking');
        res.send({data: bookings.rows});
    }

    const findUserBookings = async (req, res, next) => {
        const { userId } = req.params
        const sql = 'select * from booking where user_id = $1'
        const bookings = await pool.query(sql, [userId]);
        res.send({ data: bookings.rows });
    }

    const addUserBookings = async (req, res, next) => {
        const { userId } = req.params;
        const { image, summary, name, year } = req.body;

        const sql = 'insert into booking (image, summary, name, year, user_id) values($1, $2, $3, $4, $5)';
        await pool.query(sql, [image, summary, name, year, userId]);
        res.send({ status: 200 });
    }

    return {
        users, getUser, addUser,
        findBookings, findUserBookings, addUserBookings
    }
}