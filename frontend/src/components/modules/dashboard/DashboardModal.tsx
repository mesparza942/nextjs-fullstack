"use client";
import { useEffect, useMemo, useState } from "react";
import { Modal, Input, Button, Loading } from "../../common";
import { useBackendFetch } from "@/hooks/useBackendFetch";
import { useUser } from "@/hooks/useUser";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { User, CreateUserBody } from "@/types/api-schemas";

const DashboardModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [name, setName] = useState("");
  const { setUserName, userName } = useUser();
  const { data: session } = useSession();
  const {
    fetchData: getUser,
    data: userData,
    loading: loadingUser,
    dataFetched,
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

  const shouldCreateUser = useMemo(() => {
    if (userData?.name && !userName) {
      setUserName(userData?.name);
    }
    return !userData?.name && dataFetched;
  }, [userData, dataFetched]);

  return (
    <>
      {(loading || loadingUser) && <Loading className="fixed top-0 left-0" />}
      {shouldCreateUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h1 className="text-3xl">How do you like to be called?</h1>
          <Input
            id="user-name"
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
