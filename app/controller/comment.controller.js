const db = require("../models/index")

const getComments = async (req, res) => {


    var site_id, page_id;
    db.sites.findOne({
        where: {domain: req.headers.host},
    }).then(site => {
            site_id = site.id
            db.pages.findOne({
                where: {url: req.originalUrl, site_id: site_id},
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

    try {
        const [site, createdSite] = await db.sites.findOrCreate({
            where   : {domain: req.headers.host},
            defaults: {title: req.headers.host, active: 1, deleted: 0}
        });

        const [page, createdPage] = await db.pages.findOrCreate({
            where   : {url: req.originalUrl, site_id: site.id},
            defaults: {title: req.originalUrl, active: 1, deleted: 0}
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