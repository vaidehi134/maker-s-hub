"use client"
import { useNavigate } from "react-router-dom"
import styles from "./home.module.css"

const Home = () => {
  const navigate = useNavigate()

  const handleSignup=()=>{
    navigate("/register-client-crafter")
  }

  const handleClientSignup = () => {
    navigate("/register-client")
  }

  const handleCrafterSignup = () => {
    navigate("/register-crafter")
  }

  const handleExploreProjects = () => {
    navigate("/all-posts")
  }

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.ctaSection}>
          <h1>Custom Furniture, Crafted Just For You</h1>
          <p>
            Connect with skilled craftsmen to bring your furniture dreams to life. From concept to creation, we make
            custom furniture accessible to everyone.
          </p>
            <button className={`${styles.ctaButton} ${styles.primaryButton}`} onClick={handleSignup}>
              Get Started
            </button>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <h2>How It Works</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Post Your Project</h3>
            <p>
              Share your furniture idea with details, measurements, and references. The more specific you are, the
              better.
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Get Proposals</h3>
            <p>
              Skilled craftsmen will review your project and send you custom quotes and timelines based on your
              requirements.
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Choose Your Crafter</h3>
            <p>
              Review proposals, check portfolios, and select the perfect craftsman for your custom furniture project.
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <h3>Give Feedback</h3>
            <p>Crafter gets client's valuable feedback to encourage the crafter's sprit.</p>
          </div>
        </div>
      </section>

      {/* For Clients Section */}
      <section className={styles.forClientsSection}>
        <div className={styles.sectionContent}>
          <h2>For Clients</h2>
          <p>
            Looking for custom furniture that perfectly fits your space and style? Our platform connects you with
            skilled craftsmen who can bring your vision to life.
          </p>
          <ul className={styles.benefitsList}>
            <li>Access to a network of verified furniture craftsmen</li>
            <li>Multiple proposals to choose from for each project</li>
            <li>Secure communication and project management</li>
            <li>Quality custom furniture at competitive prices</li>
          </ul>
          <button className={`${styles.ctaButton} ${styles.primaryButton}`} onClick={handleClientSignup}>
            Sign Up as a Client
          </button>
        </div>
        <div className={styles.sectionImage}>
          <img
            src="src\components\Home\client.webp"
            alt="Client with custom furniture"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x300?text=For+Clients"
            }}
          />
        </div>
      </section>

      {/* For Craftsmen Section */}
      <section className={styles.forCraftersSection}>
        <div className={styles.sectionImage}>
          <img
            src="src\components\Home\carpenters.jpg"
            alt="Craftsman working on furniture"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x300?text=For+Craftsmen"
            }}
          />
        </div>
        <div className={styles.sectionContent}>
          <h2>For Craftsmen</h2>
          <p>
            Are you a skilled furniture craftsman looking for projects? Join our platform to connect with clients
            seeking your expertise.
          </p>
          <ul className={styles.benefitsList}>
            <li>Access to a steady stream of project opportunities</li>
            <li>Freedom to choose projects that match your skills</li>
            <li>Simple proposal submission process</li>
            <li>Secure payment system and project management tools</li>
          </ul>
          <button className={`${styles.ctaButton} ${styles.primaryButton}`} onClick={handleCrafterSignup}>
            Sign Up as a Craftsman
          </button>
        </div>
      </section>
    </div>
  )
}
export default Home