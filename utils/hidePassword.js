const ocultarPassword = (user) => {
    user.set('Password', undefined, { strict: false });
    //return user;
}
module.exports = ocultarPassword