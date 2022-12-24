const db = require("../models/index")
const helper = require("../utilities/functions")
let url;

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

        const site = await db.sites.findOne({
            where: {domain: url.host, active: 1, deleted: 0},
        });
        if(!site){
            res.send({
                "status" : 500,
                "message": "Site not found",
            })
            return;
        }


        const page = await db.pages.findOne({
            where: {site_id: site.id, url: url.path, active: 1, deleted: 0},
        });
        if(!page){
            res.send({
                "status" : 500,
                "message": "No comments found for this page. Page not found",
            })
            return;
        }

        const comments = await db.comments.findAll({
            where: {page_id: page.id},
        });

        res.send(
            {
                "status"  : 200,
                "message" : "Comments fetched successfully",
                "count"   : comments.length,
                "comments": comments,

            }
        )
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

    try {
        if (!url) {
            res.send({
                "status" : 500,
                "message": "address parameters is required. Please check your address and enter  a valid address",
            })
            return;
        }
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
        res.send({
            "status"     : 500,
            "message"    : "Error creating comment",
            "error"      : e,

        });
    }

}

module.exports = {
    getComments,
    createNewComment,
}