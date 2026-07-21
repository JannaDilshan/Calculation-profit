import React, { useState } from "react";

const InvestmentCalculator = () => {

  const [plan, setPlan] = useState("Elegance");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const investment = Number(amount.replace(/,/g, ""));


  const planDetails = {

    Elegance: {
      minimum: 100000
    },

    "Wisdom Plus": {
      minimum: 500000
    },

    "Golden Harvest": {
      minimum: 500000
    }

  };



  const roundToHundred = (value) => {

    return Math.round(value / 100) * 100;

  };



  let results = [];



  if (investment >= planDetails[plan].minimum) {



    // =========================
    // ELEGANCE PLAN
    // =========================

    if (plan === "Elegance") {


      const monthlyProfit =
        Math.floor(investment / 30);


      const annualProfit =
        roundToHundred(monthlyProfit * 12);



      const totalAmount =
        roundToHundred(
          investment + annualProfit
        );



      results = [

        [
          "Contribution Amount",
          investment
        ],

        [
          "Monthly Harvest Profit",
          monthlyProfit
        ],

        [
          "Annual Harvest Profit",
          annualProfit
        ],

        [
          "Returned Contribution Amount",
          investment
        ],

        [
          "Total Amount at Harvest",
          totalAmount
        ]

      ];

    }




    // =========================
    // WISDOM PLUS PLAN
    // =========================

    if (plan === "Wisdom Plus") {



      const year1MonthlyProfit =
        Math.floor(investment / 30);



      const year1Profit =
        roundToHundred(
          year1MonthlyProfit * 12
        );



      const year23MonthlyProfit =
        Math.floor(investment * 0.075);



      const year23Profit =
        roundToHundred(
          year23MonthlyProfit * 12 * 2
        );



      const totalHarvestProfit =
        roundToHundred(
          year1Profit + year23Profit
        );



      results = [


        [
          "Initial Contribution Amount",
          investment
        ],


        [
          "Year 1 Monthly Harvest Profit",
          year1MonthlyProfit
        ],


        [
          "Year 1 Harvest Profit",
          year1Profit
        ],


        [
          "Year 2 & 3 Monthly Harvest Profit",
          year23MonthlyProfit
        ],


        [
          "Year 2 & 3 Harvest Profit",
          year23Profit
        ],


        [
          "Total Harvest Profit",
          totalHarvestProfit
        ]


      ];

    }





    // =========================
    // GOLDEN HARVEST PLAN
    // =========================


    if (plan === "Golden Harvest") {



      const monthlyProfit =
        Math.floor(investment / 48);



      const harvestProfit =
        roundToHundred(
          monthlyProfit * 12 * 5
        );



      const cultivationProfit =
        roundToHundred(
          investment * 2.75
        );



      const returnedContribution =
        investment;



      const totalAmount =
        roundToHundred(
          harvestProfit +
          cultivationProfit +
          returnedContribution
        );



      results = [


        [
          "Contribution Amount",
          investment
        ],


        [
          "Monthly Harvest Profit",
          monthlyProfit
        ],


        [
          "5-Year Harvest Profit",
          harvestProfit
        ],


        [
          "5-Year Cultivation Profit",
          cultivationProfit
        ],


        [
          "Returned Contribution Amount",
          returnedContribution
        ],


        [
          "Total Amount at End of 5 Years",
          totalAmount
        ]

      ];

    }

  }






  const formatCurrency = (value) => {

    return value.toLocaleString(
      "en-LK",
      {
        maximumFractionDigits: 0
      }
    );

  };







  const handleChange = (e) => {


    let value =
      e.target.value.replace(/,/g, "");



    if (/^\d*$/.test(value)) {


      if (value) {


        const number = Number(value);



        setAmount(
          number.toLocaleString("en-LK")
        );



        if (number < planDetails[plan].minimum) {


          setError(
            `Minimum contribution amount is Rs. ${planDetails[plan].minimum.toLocaleString()}`
          );


        }

        else {

          setError("");

        }


      }

      else {

        setAmount("");
        setError("");

      }

    }

  };









  return (

    <div className="
    min-h-screen
    bg-gradient-to-br
    from-green-900
    via-green-700
    to-emerald-500
    flex
    items-center
    justify-center
    p-5
    ">



      <div className="
      bg-white
      max-w-5xl
      w-full
      rounded-3xl
      shadow-2xl
      p-10
      ">



        <h1 className="
        text-5xl
        font-bold
        text-center
        text-green-800
        mb-10
        ">

          🌿 Harvest Profit Calculator

        </h1>





        {/* PLAN + AMOUNT ROW */}

        <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        ">



          <div className="md:col-span-1">


            <label className="
            font-bold
            text-xl
            ">

              Select  Plan

            </label>



            <select

              value={plan}

              onChange={(e)=>{

                setPlan(e.target.value);
                setAmount("");
                setError("");

              }}

              className="
              w-full
              mt-3
              p-5
              rounded-2xl
              border-4
              border-green-300
              bg-green-50
              text-xl
              font-bold
              "

            >


              <option>
                Elegance
              </option>

              <option>
                Wisdom Plus
              </option>

              <option>
                Golden Harvest
              </option>


            </select>


          </div>







          <div className="md:col-span-2">


            <label className="
            font-bold
            text-xl
            ">

              Contribution Amount (Rs.)

            </label>



            <input

              type="text"

              value={amount}

              onChange={handleChange}

              placeholder={
                planDetails[plan].minimum.toLocaleString()
              }


              className="
              w-full
              h-20
              mt-3
              px-8
              text-4xl
              font-bold
              rounded-3xl
              border-4
              border-green-300
              bg-green-50
              text-green-800
              outline-none
              "

            />


          </div>


        </div>







        {error &&

          <p className="
          text-red-600
          font-bold
          mt-5
          ">

            {error}

          </p>

        }







        {results.length > 0 && !error &&


          <table className="
          w-full
          mt-10
          rounded-3xl
          overflow-hidden
          shadow-xl
          ">


            <tbody>


              {

                results.map((item,index)=>(


                  <tr

                    key={index}

                    className={

                      item[0].includes("Total")

                      ?

                      "bg-yellow-400"

                      :

                      "bg-green-50"

                    }

                  >


                    <td className="
                    p-5
                    font-semibold
                    ">

                      {item[0]}

                    </td>



                    <td className="
                    p-5
                    text-right
                    font-bold
                    text-green-900
                    ">

                      Rs. {formatCurrency(item[1])}

                    </td>


                  </tr>


                ))

              }


            </tbody>


          </table>


        }



      </div>


    </div>

  );


};


export default InvestmentCalculator;