import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (req: express.Request, res: express.Response) => {
  try {
    console.log("The fullUrl is:", req.body.fullUrl);
    const { fullUrl } = req.body;

    const urlFound = await urlModel.find({ fullUrl });
    if (urlFound.length > 0) {
      return res.status(409).send(urlFound); 
    }

    const shortUrl = await urlModel.create({ fullUrl });
    return res.status(201).send(shortUrl);
  } catch (error) {
    console.error("Error in createUrl:", error); 
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const getAllUrls = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrls = await urlModel.find();
    if (shortUrls.length === 0) { 
      return res.status(404).send({ error: "shortUrls not found" });
    }
    return res.status(200).send(shortUrls);
  } catch (error) {
    console.error("Error in getAllUrls:", error);
    return res.status(500).send({ error: "Something went wrong!" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            return res.status(404).send({ message: "FullUrl not found!" });
        } else {
            shortUrl.clicks++;
            await shortUrl.save(); // Added await for safety
            
            // FIXED: Changed single quotes ' ' to backticks ` `
            res.redirect(`${shortUrl.fullUrl}`); 
        }
    } catch (error) {
        return res.status(500).send({ error: "Something went wrong!" });
    }
};

export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        // FIXED: findByIdAndDelete takes the ID directly, not an object
        const shortUrl = await urlModel.findByIdAndDelete(req.params.id);
        if (shortUrl) {
            return res.status(200).send({ message: "Requested URL successfully deleted!" });
        } else {
            return res.status(404).send({ message: "URL not found" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Something went wrong!" });
    }
};