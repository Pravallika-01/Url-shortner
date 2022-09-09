import express from 'express'
import Urls from "../Models/Urls.js"


const getRandomString = (len) => {
    let randomString = ''
    const characters = "1234567890qwertasdfghjklxcvbnmQWERTOASDFGHJKZXCVM()'!~*"

    while (len) {
        randomString += characters[Math.floor(Math.random() * characters.length)]
        len--
    }

    return randomString
}

export const getLink = (req, res) => {
    try {
        link = req.body.link

        Urls.findOne({ link : link }, (err, foundUrl) => {
            if (err) {
                console.log(err)
            } else {
                if (foundUrl) {
                    res.status(200).json({shortLink : foundUrl.shortLink})
                } else {
                    res.status(404).json({message : 'not found'})
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({ message : error.message })
    }
}

export const postLink = (req, res) => {
    try {
        const shortLink = `${getRandomString(9)}`

        Urls.findOne({ link: req.body.link }, (err, foundUrl) => {
            if (err) {
                console.log(err)
            } else {
                if (foundUrl) {
                    res.status(200).json({ shortUrl: foundUrl.shortLink })
                } else {
                    Urls.findOne({ shortLink: shortLink }, (err, foundUrl) => {
                        if (err) {
                            console.log(err)
                        } else {
                            if (foundUrl) {
                                postLink(req, res)
                            } else {
                                const inputData = {
                                    shortLink: shortLink,
                                    link: req.body.link
                                }

                                const newUrl = new Urls(inputData)
                                newUrl.save((err, data) => {
                                    if (err) return console.log(err)
                                    console.log(data)
                                })

                                res.status(200).json({ shortUrl: shortLink })
                            }
                        }
                    })
                }
            }
        })


    } catch (error) {
        console.log(error)
        // console.log(req.body)
        res.status(404).json({ message: error.message })
    }
}

export const redirectLink = (req, res) => {
    try {
        const shortLink = req.params.shortLink

        Urls.findOne({ shortLink: shortLink }, (error, foundUrl) => {
            if (error) {
                console.log(error)
            } else {
                if (foundUrl) {
                    res.status(200).redirect(foundUrl.link)
                } else {
                    res.status(404).json(foundUrl)
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({ message : error.message })
    }
}

export const getAllLinks = (req, res) => {
    try {
        Urls.find({}, (err, foundUrls) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(foundUrls)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({ message : error.message })
    }
}