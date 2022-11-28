const db = require("../models/index")
const helper = require("../utilities/functions")
let url;
let site_id, page_id;
const getComments = async (req, res) => {
    try {

        url = helper.getUrlParams(req.body.address)

        if (!url) {
            res.send({
                "status" : 500,
                "message": "address parameters is required. Please check your address and enter  a valid address",
            })
            return;
        }

        await db.sites.findOne({
            where: {domain: url.host, active: 1, deleted: 0},
        }).then(site => {
            if (!site) {
                res.send({
                    "status" : 500,
                    "message": "Site not found.",
                })
                return;
            }
            site_id = site.id;
        }).catch(err => {
            res.send({
                "status" : 500,
                "message": err.message,
            })
        });

        await db.pages.findOne({
            where: {site_id: site_id, url: url.path, active: 1, deleted: 0},
        }).then(page => {
            if (!page) {
                res.status(200).send({
                    "status" : 500,
                    "message": "No comments found for this page.",
                });
                return;
            }
            page_id = page.id;

        }).catch(err => {
            res.send({
                "status" : 500,
                "message": err.message,
            })
        });

        await db.comments.findAll({
            where: {page_id: page_id},
        }).then(comments => {
            res.status(200).send({
                "status"  : 200,
                "message" : "Comments fetched successfully",
                "comments": comments,
            });
        }).catch(err => {
            res.send({
                "status" : 500,
                "message": err.message,
            })
        });
    } catch (e) {
        res.send(
            {
                "status" : 500,
                "message": e.message,
            }
        )
    }
}


const createNewComment = async (req, res) => {
    url = helper.getUrlParams(req.body.address);
    if (!url) {
        res.send({
            "status" : 500,
            "message": "address parameters is required. Please check your address and enter  a valid address",
        })
        return;
    }
    try {
        const [site, createdSite] = await db.sites.findOrCreate({
            where   : {domain: url.host},
            defaults: {title: url.host, active: 1, deleted: 0}
        });

        const [page, createdPage] = await db.pages.findOrCreate({
            where   : {url: url.path, site_id: site.id},
            defaults: {title: url.path, active: 1, deleted: 0}
        });

        // create comment to add site and page id
        const comment = await db.comments.create({
            comment  : req.body.comment,
            selector : req.body.selector,
            site_id  : site.id,
            page_id  : page.id,
            parent_id: 0,
            index    : 0,
            active   : 1,
            deleted  : 0
        });

        res.send({
            "status"     : 200,
            "message"    : "Comment created successfully",
            "site"       : site,
            "createdSite": createdSite,
            "page"       : page,
            "createdPage": createdPage,
            "comment"    : comment,
        });

    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    getComments,
    createNewComment,
}