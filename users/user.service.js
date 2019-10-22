const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const details = require('details.json');



const nodemailer = require('nodemailer');

const User = db.User;

module.exports = {

    authenticate,
    getAll,
    getById,
    create,
    update,
    getbyrole,
    delete: _delete,
    mailSend

};

async function mailSend(data, callback) {
    attac = [];
 
    console.log("This is he mailSend method in service");
   
    for ( let i =0 ; i <data.fileDetails.length ; i ++) {

        attac.push({

            filename: data.fileDetails[i],
            path:   '/Users/Manoj/papyrus/uploads/'+ data.valueMail.id + '/' + data.fileDetails[i]

        } )
        console.log(attac);
            
             

    }
    console.log("Here is the Email : " + details.email);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: details.email,
            pass: details.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    let mailOption ={
        from: '"Papyrus"', // sender address
        to: data.valueMail.mailName, // list of receivers
        subject: 'PAPRUS FILE INFORMATION MAIL FOR ID : '+ data.valueMail.id, // Subject lixne
        text: 'Hello world?', // plain text body
        html:` <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body style="margin: 0; padding: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                <tr>
                    <td style="padding: 10px 0 30px 0;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                            <tr>
                                <td align="center" bgcolor="orange" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                    <img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6a/d4/f2.jpg" alt="Creating Email Magic" width="300" height="230" style="display: block;" />
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;" align = "center">
                                                <b>Paprus File Information deails <br>`+ data.valueMail.id + `</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                               This was created on ` + data.valueMail.createdDate + ` also below you can see the relevent information
                                            </td>
                                        </tr>
                                        <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; ">
                                        <b>Assign User : </b> ` + data.valueMail.assignUser + ` <br>
                                    </td>
                                    <br>
                                        </tr>
                                        <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <b>Sender : </b> ` + data.valueMail.currentUser + ` <br>
                                    </td>
                                        </tr>
                                        <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <b>Job description : </b> ` + data.valueMail.jobDescription + ` <br>
                                    </td>
                                        </tr>
                                        <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <b>Sender Mail Address : </b> ` + data.valueMail.mailName + ` <br>
                                    </td>
                                        </tr>
                                        <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <b>File Names : </b> ` + data.fileDetails + ` <br>
                                    </td>
                                        </tr>
                                        <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <b>Comments : </b> ` + data.idComment + ` <br>
                                    </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td width="260" valign="top">
                                                          
                                                        </td>
                                                        <td style="font-size: 0; line-height: 0;" width="20">
                                                            &nbsp;
                                                        </td>                                                       
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#FF8C00" style="padding: 30px 30px 30px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" width="75%">
                                                &reg; PAPRUS, somewhere 2019<br/>
                                                <a href="#" style="color: #ffffff;"><font color="#ffffff">Unsubscribe</font></a> to this Description instantly
                                            </td>
                                            <td align="right" width="25%">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html> `,// html body

        attachments : attac 
         
    };

    let info = await transporter.sendMail(mailOption);
    //attac length will o in below
    attac.length = 0 ;
        callback(info);
   

}





async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    console.log(user);
    if (user && bcrypt.compareSync(password, user.hash)) {
        //  if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

//Get data
async function getAll() {
    return await User.find({});
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function getbyrole(role) {
    return await User.findByrole(role);

}

async function create(userParam) {
    console.log("test");
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    console.log(user);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {

        userParam.hash = bcrypt.hashSync(userParam.password, 10);

    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
    
    
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
