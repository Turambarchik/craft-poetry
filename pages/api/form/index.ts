// import { getServerSession } from 'next-auth';
// import { authOptions } from "../auth/[...nextauth]";
import { MOCK_EMAIL } from "@/helpers/constants";
import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, content, type, draft = true, published = false } = req.body;

  //   const session = await getServerSession(req, res, authOptions);

  //   if (!session) {
  //     return res.status(401).json({ error: "Unauthorized" });
  //   }

  try {
    const result = await prisma.form.create({
      data: {
        title,
        content,
        type,
        draft,
        published,
        author: { connect: { email: MOCK_EMAIL } },
      },
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: "Failed to create form" });
  }
}
