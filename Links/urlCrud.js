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

export const postLink = (req, res) => {
    try {
        const shortLink = `${getRandomString(9)}`

        Urls.findOne({ link: req.body.link }, (err, foundUrl) => {
            if (err) {
                console.log(err)
            } else {
                if (foundUrl) {
                    res.status(200).send({ shortUrl: foundUrl.shortLink })
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

                                res.status(200).send({ shortUrl: shortLink })
                            }
                        }
                    })
                }
            }
        })


    } catch (error) {
        console.log(error)
        // console.log(req.body)
        res.status(404).send({ message: error.message })
    }
}

export const getLink = (req, res) => {
    try {
        const shortLink = req.params.shortLink

        Urls.findOne({ shortLink: shortLink }, (error, foundUrl) => {
            if (error) {
                console.log(error)
            } else {
                if (foundUrl) {
                    res.status(200).send(foundUrl)
                } else {
                    res.status(404).send(foundUrl)
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({ message : error.message })
    }
}

export const getAllLinks = (req, res) => {
    try {
        Urls.find({}, (err, foundUrls) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(foundUrls)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({ message : error.message })
    }
}