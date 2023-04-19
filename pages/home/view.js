import Layout from "@/component/Layout";
import BlogView from "@/component/BlogView";

const data = {
  id: 1,
  username: "alibinabu",
  userImage: "ali",
  title: "travel to Japan",
  image: "ali",
  date: "18-4-2023",
  country: "Asia",
  like: 243,
  view: 500,
  rating: 2.9,
  description:
    "How do we become better every single day? We develop practices that will help move us incrementally forward. Small steps, taken consistently. This is the path to a good life.While routines can be important for consistency and productivity, what is even more important is our practices. These are things we do, no matter what our routine looks like, no matter if something comes up that derails us.But we need to start small and make sure our practices are sustainable. The idea is to take small but consistent steps, every single day — 1% improvement.",
};

export default function view() {
  return (
    <Layout>
      <BlogView
        key={data.id}
        image={data.image}
        title={data.title}
        username={data.username}
        date={data.date}
        like={data.like}
        view={data.view}
        rating={data.rating}
        description={data.description}
      />
    </Layout>
  );
}
