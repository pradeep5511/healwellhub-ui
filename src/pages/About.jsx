import Navbar from "../components/Navbar";
import "./About.css";
import profilePic from "../assets/profile.jpg";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="about-container">
        <div className="about-card">
          <img
            src={profilePic}
            alt="Founder of HealWellHub"
            className="profile-img"
          />

          <div className="about-content">
            <h1>About HealWellHub</h1>

            <p>
              HealWellHub is a health-tech initiative created with a clear
              purpose — to simplify healthcare access and understanding through
              responsible technology.
            </p>

            <p>
              In today’s digital world, people often receive medical reports and
              prescriptions without fully understanding what they mean or what
              steps to take next. Finding the right doctor at the right time and
              navigating healthcare systems can be overwhelming. HealWellHub
              aims to bridge this gap by acting as a smart, reliable digital
              companion that supports users throughout their healthcare journey.
            </p>

            <h2>Founder’s Background</h2>

            <p>
              HealWellHub is founded by a senior backend and full-stack engineer
              with over a decade of experience building scalable, secure, and
              high-performance enterprise systems across multiple domains.
            </p>

            <p>
              Having worked extensively in banking, financial services, and
              large enterprise environments, this experience brings a strong
              focus on reliability, security, and scalability — qualities that
              are essential when dealing with sensitive healthcare data.
            </p>

            <h2>Technology with Responsibility</h2>

            <p>
              HealWellHub is built using modern, proven technologies and
              engineering practices to ensure secure handling of health
              information, high availability, and a clean, intuitive user
              experience. While technology powers the platform behind the
              scenes, the primary focus remains on simplicity, safety, and
              trust for users.
            </p>

            <h2>Our Purpose</h2>

            <p>
              HealWellHub does not aim to replace doctors or provide medical
              diagnosis. Instead, it serves as a supportive digital layer that
              helps users better understand medical information and connect
              with the right healthcare professionals at the right time.
            </p>

            <p className="disclaimer">
              ⚠️ Medical Disclaimer: HealWellHub does not provide medical
              diagnosis or treatment. All information on this platform is for
              educational and assistance purposes only. Always consult
              qualified healthcare professionals for medical decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
