import { Router } from "express";
import { PrismaUserRepository } from "../../prisma/PrismaUserRepository";
import { CreateUserService } from "../../../application/services/CreateUser";
import { GetUserService } from "../../../application/services/GetUser";

const router = Router();
const userRepository = new PrismaUserRepository();

router.post("/", async (req, res) => {
  try {
    const createUserService = new CreateUserService(userRepository);
    const note = await createUserService.execute(req.body);
    res.status(201).json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getUserService = new GetUserService(userRepository);
    const user = await getUserService.execute({
      userId: Number(req.params.id),
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
