const db = require("../models/index")
const helper = require("../utilities/functions")
let url;
const getComments = async (req, res) => {

    url = helper.getUrlParams(req.body.address)

   if(!url) {
        res.send({
            "status" : 500,
            "message": "address parameters is required.",
        })
        return;
   }
    var site_id, page_id;
    db.sites.findOne({
        where: {domain: url.host},
    }).then(site => {
            site_id = site.id
            db.pages.findOne({
                where: {url: url.path, site_id: site_id},
            }).then(page => {
                page_id = page.id
                db.comments.findAll({
                    where: {page_id: page_id},
                }).then(comments => {
                    res.send({
                        "status"  : 200,
                        "message" : "Comments fetched successfully",
                        "comments": comments,
                    });
                })
            })
        }
    ).catch(e => {
        res.send({
            "status" : 500,
            "message": e.message,
        })
    })


}


const createNewComment = async (req, res) => {
    url = helper.getUrlParams(req.body.address);
    if(!url) {
        res.send({
            "status" : 500,
            "message": "address parameters is required.",
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