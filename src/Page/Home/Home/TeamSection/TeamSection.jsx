import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
const TeamSection = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      imageUrl: "https://picsum.photos/200",
    },
    {
      name: "Jane Smith",
      role: "Backend Developer",
      imageUrl: "https://picsum.photos/200",
    },
    {
      name: "Sam Wilson",
      role: "UI/UX Designer",
      imageUrl: "https://picsum.photos/200",
    },
    {
      name: "Merry",
      role: "DevOps Engineer",
      imageUrl: "https://picsum.photos/200",
    },
    {
      name: "Johny",
      role: "Product Manager",
      imageUrl: "https://picsum.photos/200",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="md:my-10 my-5">
        <SectionHeader title={"Our Team"}></SectionHeader>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 text-center"
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-2"
            />
            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
