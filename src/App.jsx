import { useState } from "react";
import "./style.css";

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <h1>Application submitted</h1>

          <p>
            Your WestPay account application has been successfully
            submitted and is currently under review.
          </p>

          <div className="application-id">
            <small>Application ID</small>
            <strong>WP-482931</strong>
          </div>

          <div className="status">
            ● Under Review
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <header className="header">
        <div className="logo">
          <span>W</span>
          WestPay
        </div>

        <div className="secure">
          ● Secure application
        </div>
      </header>

      <main className="container">

        <div className="intro">
          <small>ACCOUNT APPLICATION</small>

          <h1>Apply for a WestPay account</h1>

          <p>
            Tell us about yourself and your business to get started
            with WestPay payment services.
          </p>
        </div>

        <div className="steps">
          <div className="step active">
            <b>1</b>
            <span>Information</span>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <b>2</b>
            <span>Verification</span>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <b>3</b>
            <span>Review</span>
          </div>
        </div>

        <form
          className="application"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >

          <section>
            <div className="section-title">
              <small>01</small>

              <div>
                <h2>Personal information</h2>
                <p>
                  Tell us who will manage this account.
                </p>
              </div>
            </div>

            <div className="form-grid">

              <div className="field">
                <label>Full name</label>
                <input
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="field">
                <label>Email address</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                />
              </div>

              <div className="field">
                <label>Phone number</label>
                <input
                  required
                  placeholder="+228 90 00 00 00"
                />
              </div>

              <div className="field">
                <label>Country of residence</label>

                <select required>
                  <option value="">
                    Select country
                  </option>

                  <option>Togo</option>
                  <option>Benin</option>
                  <option>Côte d'Ivoire</option>
                  <option>Burkina Faso</option>
                  <option>Mali</option>
                  <option>Senegal</option>
                  <option>Cameroon</option>
                  <option>Nigeria</option>
                  <option>Other</option>
                </select>
              </div>

            </div>
          </section>

          <section>

            <div className="section-title">
              <small>02</small>

              <div>
                <h2>Identity verification</h2>

                <p>
                  Provide your identification documents.
                </p>
              </div>
            </div>

            <div className="upload-grid">

              <label className="upload-box">
                <input type="file" hidden />

                <strong>↑</strong>

                <span>
                  ID Card — Front
                  <small>
                    Upload document
                  </small>
                </span>
              </label>

              <label className="upload-box">
                <input type="file" hidden />

                <strong>↑</strong>

                <span>
                  ID Card — Back
                  <small>
                    Upload document
                  </small>
                </span>
              </label>

              <label className="upload-box">
                <input type="file" hidden />

                <strong>↑</strong>

                <span>
                  Selfie 🤳
                  <small>
                    Upload clear photo
                  </small>
                </span>
              </label>

              <label className="upload-box">
                <input type="file" hidden />

                <strong>↑</strong>

                <span>
                  Proof of address
                  <small>
                    Upload document
                  </small>
                </span>
              </label>

            </div>

          </section>

          <section>

            <div className="section-title">
              <small>03</small>

              <div>
                <h2>Business information</h2>

                <p>
                  Tell us about your business activity.
                </p>
              </div>
            </div>

            <div className="form-grid">

              <div className="field">
                <label>Business name</label>

                <input
                  required
                  placeholder="Your company name"
                />
              </div>

              <div className="field">
                <label>Website</label>

                <input
                  placeholder="https://example.com"
                />
              </div>

              <div className="field full">
                <label>
                  Business activity
                </label>

                <textarea
                  required
                  placeholder="Describe your business activity..."
                />
              </div>

              <div className="field full">
                <label>
                  Business address
                </label>

                <input
                  required
                  placeholder="City, country"
                />
              </div>

            </div>

          </section>

          <section>

            <div className="section-title">
              <small>04</small>

              <div>
                <h2>Payment profile</h2>

                <p>
                  Tell us about your expected payment activity.
                </p>
              </div>
            </div>

            <div className="form-grid">

              <div className="field">

                <label>
                  Expected monthly volume
                </label>

                <select required>

                  <option value="">
                    Select expected volume
                  </option>

                  <option>
                    Less than $1,000
                  </option>

                  <option>
                    $1,000 – $5,000
                  </option>

                  <option>
                    $5,000 – $10,000
                  </option>

                  <option>
                    $10,000 – $50,000
                  </option>

                  <option>
                    $50,000 – $100,000
                  </option>

                  <option>
                    More than $100,000
                  </option>

                </select>

              </div>

              <div className="field">

                <label>
                  Monthly transactions
                </label>

                <select>

                  <option>
                    1 – 100
                  </option>

                  <option>
                    100 – 500
                  </option>

                  <option>
                    500 – 1,000
                  </option>

                  <option>
                    1,000 – 5,000
                  </option>

                  <option>
                    5,000+
                  </option>

                </select>

              </div>

              <div className="field full">

                <label>
                  Countries of operation
                </label>

                <div className="countries">

                  <label>
                    <input type="checkbox" />
                    Togo
                  </label>

                  <label>
                    <input type="checkbox" />
                    Benin
                  </label>

                  <label>
                    <input type="checkbox" />
                    Côte d'Ivoire
                  </label>

                  <label>
                    <input type="checkbox" />
                    Burkina Faso
                  </label>

                  <label>
                    <input type="checkbox" />
                    Mali
                  </label>

                  <label>
                    <input type="checkbox" />
                    Senegal
                  </label>

                  <label>
                    <input type="checkbox" />
                    Cameroon
                  </label>

                  <label>
                    <input type="checkbox" />
                    Nigeria
                  </label>

                </div>

              </div>

              <div className="field full">

                <label>
                  How do you plan to use the WestPay API?
                </label>

                <textarea
                  required
                  placeholder="Describe your use case..."
                />

              </div>

            </div>

          </section>

          <section className="submit-section">

            <div className="section-title">

              <small>05</small>

              <div>
                <h2>
                  Review & submit
                </h2>

                <p>
                  Confirm your information before submitting.
                </p>
              </div>

            </div>

            <label className="agreement">

              <input
                required
                type="checkbox"
              />

              <span>
                I confirm that the information provided is
                accurate and I agree to the Terms of Service
                and Privacy Policy.
              </span>

            </label>

            <button type="submit">
              Submit application →
            </button>

          </section>

        </form>

      </main>

      <footer>
        <span>
          © 2026 WestPay
        </span>

        <div>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </footer>

    </div>
  );
}
