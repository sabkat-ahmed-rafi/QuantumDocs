const Document = require("../model/documentModel");

const checkDocumentAccess = async (req, res, next) => {
    const { id } = req.params;
    const userEmail = req.user.email;

    const document = await Document.findById( id );

    if(document.owner.email === userEmail) {
        req.userRole = 'owner';
        return next();
    }

    const sharedPerson = document.sharedPersons.find(person => person.email === userEmail);

    if(!sharedPerson) {
        return res.status(403).json({ message: "You don't have acces to this document" });
    }

    req.userRole = sharedPerson.role;
    next();
}

module.exports = checkDocumentAccess;