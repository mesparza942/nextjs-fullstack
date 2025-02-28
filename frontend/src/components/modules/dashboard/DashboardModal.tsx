"use client";
import { useEffect, useMemo, useState } from "react";
import { Modal, Input, Button, Loading } from "../../common";
import { useBackendFetch } from "@/hooks/useBackendFetch";
import { useUser } from "@/hooks/userUser";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { User, CreateUserBody } from "@/types/api-schemas";

const DashboardModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [name, setName] = useState("");
  const { setUserName } = useUser();
  const { data: session } = useSession();
  const {
    fetchData: getUser,
    data: userData,
    loading: loadingUser,
  } = useBackendFetch<User, null>({
    api: `/user/${session?.cognitoId}`,
    method: "GET",
  });
  const { fetchData: createUser, loading } = useBackendFetch<
    User,
    CreateUserBody
  >({ api: "/user", method: "POST" });

  useEffect(() => {
    if (session?.cognitoId) {
      getUser();
    } else {
      redirect("/login");
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    await createUser({ name });
    setUserName(name);
    setIsModalOpen(false);
  };

  const shouldCreateUser = useMemo(
    () => !loadingUser && !userData,
    [loadingUser, userData]
  );

  return (
    <>
      {(loading || loadingUser) && <Loading className="fixed top-0 left-0" />}
      {shouldCreateUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h1 className="text-3xl">How do you like to be called?</h1>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
          <Button onClick={handleSubmit}>Save</Button>
        </Modal>
      )}
    </>
  );
};

export default DashboardModal;
