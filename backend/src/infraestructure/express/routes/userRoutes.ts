import { Router } from "express";
import { PrismaUserRepository } from "../../prisma/PrismaUserRepository";
import { CreateUserService } from "../../../application/services/CreateUser";
import { GetUserService } from "../../../application/services/GetUser";

const router = Router();
const userRepository = new PrismaUserRepository();

router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }
    const createUserService = new CreateUserService(userRepository);
    const user = await createUserService.execute({
      name: req.body.name,
      cognitoId: req.user!.username!,
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getUserService = new GetUserService(userRepository);
    const user = await getUserService.execute({
      cognitoId: req.params.id,
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
