import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://media.architecturaldigest.com/photos/59f1e7e1b56ff84bcaa873d0/master/w_320%2Cc_limit/Kentucky%2520(back)-%2520Courtesy%2520of%2520Trulia.jpg",
//     address: "some address 5",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://media.architecturaldigest.com/photos/59f1e7e1b56ff84bcaa873d0/master/w_320%2Cc_limit/Kentucky%2520(back)-%2520Courtesy%2520of%2520Trulia.jpg",
//     address: "some address 6",
//     description: "This is a second meetup",
//   },
// ];

function HomePage(props) {
  console.log("hi");

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from api
//   return {
//     meetups: DUMMY_MEETUPS
//   };
// }

//prepare props for page before render
export async function getStaticProps() {
  //fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://new_user:Welcome2023@cluster0.swbqxie.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  //always need to return object
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 5,
  };
}

export default HomePage;
