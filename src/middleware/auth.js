require("dotenv").config();   // goi de dung phia duoi process.env.JWT_SECRET
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
        const white_lists = ["/", "/register", "/login"]    // danh sach ko check auth cho di tiep
        if(white_lists.find(item => '/v1/api' + item === req.originalUrl)){
            next();
        }else {
            if(req?.headers?.authorization?.split(' ')?.[1]){                   // if(req.headers && req.headers.authorization)  // viet kieu tuong minh hoac tat nhu kia
                const token = req.headers.authorization.split(' ')[1];
                //verify
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET)
                    req.user = {
                        email: decoded.email,
                        name: decoded.name,
                        createdBy: "tunaTran"
                    }
                    console.log(">>> check token", decoded);
                    next();
                } catch (error) {
                    return res.status(401).json({
                        message: "Token bị hết hạn/Hoặc không hợp lệ"
                    })
                }
                
            }else {
                // return exception
                return res.status(401).json({
                    message: "Bạn chưa truyền Access Token ở header/Hoặc token bị hết hạn"
                })
            }
        }

}

module.exports = auth;