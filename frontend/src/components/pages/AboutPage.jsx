import "../../styles/css/AboutPage.css";

function AboutPage() {
  return (
    <main className="main-content">
      <article className="about-page-card">
        <header className="container-topbar">
          <h1 className="title">Welcome</h1>
        </header>
        <section className="about-page-paragraph">
          <div className="card-container">
            <div className="card">
              <h2 className="hire-title">About Us</h2>

              <div className="paragraph">
                <p>
                  Bar-None Club is a lively, community-driven venue in the heart
                  of Bristol, offering a little something for everyone.
                </p>
                <p>
                  We're known for hosting an exciting mix of live music, comedy,
                  and community events that bring people together. Whether
                  you're into electronic beats, live bands, or a good laugh,
                  we've got you covered.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="paragraph">
                <p>
                  But it's not just about entertainment— we know how important
                  it is for people to grow and learn. We run hands-on workshops
                  focusing on practical skills like carpentry and cooking,
                  giving people in the community the chance to pick up new
                  skills and improve their day-to-day lives.
                </p>
              </div>
            </div>
          </div>

          <div className="card-container">
            <div className="card">
              <h2 className="hire-title">Hire Our Space</h2>
              <div className="paragraph">
                <p>
                  Need a place to hold your event? Bar-None is available for
                  hire too. Whether you're planning a party or something special
                  for the community, our space is flexible, welcoming, and ready
                  to accommodate your needs.
                </p>
              </div>
              <div className="card"></div>
              <div className="paragraph">
                <p>
                  Feel free to get in touch with us for more info. We're always
                  happy to help and would love to have you be a part of our
                  community!
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

export default AboutPage;
