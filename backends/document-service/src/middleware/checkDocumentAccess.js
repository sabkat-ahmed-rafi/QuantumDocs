const Document = require("../model/documentModel");

const checkDocumentAccess = async (req, res, next) => {
    const { id } = req.params;
    const userEmail = req.user.email;

    const document = await Document.findById( id );

    if (document.owner.email === userEmail) {
        req.userRole = 'owner';
        return next();
    }

    if (document.accessStatus.isRestricted) {
        const sharedPerson = document.sharedPersons.find(person => person.email === userEmail);

        if (!sharedPerson) {
            return res.status(403).json({ message: "Access denied. Document is restricted" });
        };

        req.userRole = sharedPerson.role;
        next();
    };

    req.userRole = document.accessStatus.role;
    next();

}

module.exports = checkDocumentAccess;