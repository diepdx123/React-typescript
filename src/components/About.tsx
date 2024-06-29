function About() {
  type Info = {
    name: string;
    email: string;
    age: number;
    GPA: number;
    gender: string;
    birthday: string;
  };

  const myInfo: Info = {
    name: "Dang Xuan Diep",
    email: "diepdxph32317@gmail.com",
    age: 20,
    GPA: 10,
    gender: "Man",
    birthday: "16-01-2004",
  };

  return (
    <>
      <h1>Thong tin ca nhan</h1>
      <p>Name: {myInfo.name}</p>
      <p>Email: {myInfo.email}</p>
      <p>Age: {myInfo.age}</p>
      <p>GPA: {myInfo.GPA}</p>
      <p>Gender: {myInfo.gender}</p>
      <p>Birthday: {myInfo.birthday}</p>
    </>
  );
}

export default About;
