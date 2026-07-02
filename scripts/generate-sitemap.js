import fs from "fs";
import path from "path";

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

const SITE = "https://www.ciclosebiorritmos.com";

async function generate() {

    const snapshot = await db.collection("posts").get();

    const posts = snapshot.docs.map(doc => ({
        id: doc.id
    }));

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

`;

    //----------------------------------------
    // páginas fixas
    //----------------------------------------

    const pages = [

        ["/",1.0,"weekly"],

        ["/calculadora",0.9,"monthly"],

        ["/blog",0.9,"weekly"],

        ["/sobre",0.8,"monthly"],

        ["/contato",0.7,"monthly"],

        ["/privacidade",0.5,"yearly"],

        ["/termosdeuso",0.5,"yearly"],

        ["/avisolegal",0.5,"yearly"]

    ];

    pages.forEach(page=>{

        xml += `
<url>

<loc>${SITE}${page[0]}</loc>

<lastmod>${today}</lastmod>

<changefreq>${page[2]}</changefreq>

<priority>${page[1]}</priority>

</url>
`;

    });

    //----------------------------------------
    // posts
    //----------------------------------------

    posts.forEach(post=>{

        xml += `
<url>

<loc>${SITE}/post/${post.id}</loc>

<lastmod>${today}</lastmod>

<changefreq>monthly</changefreq>

<priority>0.8</priority>

</url>
`;

    });

    xml += "\n</urlset>";

    fs.writeFileSync(
        path.join("public","sitemap.xml"),
        xml
    );

    console.log("✔ sitemap.xml gerado.");
}

generate();