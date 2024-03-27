"use server";

export async function registerUserAction(formData: FormData) {
  console.log("Hello From Register User Action");

  const fields = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };

  console.log("#############");
  console.log(fields);
  console.log("#############");
}
