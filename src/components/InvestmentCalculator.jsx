import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import BankRate from "./BankRate";


const InvestmentCalculator = () => {


  const [plan, setPlan] = useState("Elegance");

  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");




  const investment = Number(
    amount.replace(/,/g, "")
  );





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







  // =========================
  // ELEGANCE PLAN
  // =========================


  if (
    investment >= planDetails[plan].minimum
  ) {



    if(plan === "Elegance"){



      const monthlyProfit =
        Math.floor(
          investment / 30
        );




      const annualProfit =
        roundToHundred(
          monthlyProfit * 12
        );




      const totalAmount =
        roundToHundred(
          investment +
          annualProfit
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

if(plan === "Wisdom Plus"){


  const year1MonthlyProfit =
    Math.floor(
      investment / 30
    );



  const year1Profit =
    roundToHundred(
      year1MonthlyProfit * 12
    );



  const year23MonthlyProfit =
    Math.floor(
      investment * 0.075
    );



  const year23Profit =
    roundToHundred(
      year23MonthlyProfit *
      12 *
      2
    );



  const totalHarvestProfit =
    roundToHundred(
      year1Profit +
      year23Profit
    );


  const totalAmount =
    roundToHundred(
      totalHarvestProfit 
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
      "Total Amount at Harvest",
      totalAmount
    ]


  ];



}

    // =========================
    // GOLDEN HARVEST PLAN
    // =========================


    if(plan === "Golden Harvest"){



      const monthlyProfit =
        Math.floor(
          investment / 48
        );




      const harvestProfit =
        roundToHundred(
          monthlyProfit *
          12 *
          5
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
  // =========================
// FORMAT CURRENCY
// =========================


const formatCurrency = (value) => {


  return value.toLocaleString(
    "en-LK",
    {
      maximumFractionDigits:0
    }
  );


};









// =========================
// INPUT CHANGE FUNCTION
// =========================


const handleChange = (e) => {


  let value =
    e.target.value.replace(
      /,/g,
      ""
    );




  if(/^\d*$/.test(value)){



    if(value){



      const number =
        Number(value);




      setAmount(

        number.toLocaleString(
          "en-LK"
        )

      );





      if(
        number <
        planDetails[plan].minimum
      ){


        setError(

          `Minimum contribution amount is Rs. ${planDetails[plan].minimum.toLocaleString()}`

        );


      }

      else{


        setError("");


      }




    }

    else{


      setAmount("");

      setError("");


    }



  }



};











// =========================
// GET TOTAL HARVEST AMOUNT
// =========================


const getTotalHarvestAmount = () => {



  const totalRow = results.find(

    (item)=>

      item[0].includes("Total Amount")

  );



  return totalRow

    ? totalRow[1]

    : 0;



};











// =========================
// BANK RATE CALCULATION
// =========================


const bankRate = 0.11;



const bankComparison = (years)=>{


  return Math.round(

    investment *
    bankRate *
    years

  );


};












// =========================
// PDF GENERATE FUNCTION
// =========================


const generatePDF = () => {



  if(
    results.length === 0 ||
    error
  )

  return;





  const doc =
    new jsPDF();






  doc.setFontSize(22);



  doc.setTextColor(
    34,
    139,
    34
  );




  doc.text(

    "Harvest Profit Calculator",

    105,

    20,

    {
      align:"center"
    }

  );







  doc.setFontSize(14);

  doc.setTextColor(0);






  doc.text(

    `Investment Plan : ${plan}`,

    14,

    35

  );






  doc.text(

    `Contribution Amount : Rs. ${formatCurrency(investment)}`,

    14,

    45

  );









// =========================
// INVESTMENT RESULT TABLE
// =========================


autoTable(doc,{



  startY:55,



  head:[

    [

      "Description",

      "Amount (Rs.)"

    ]

  ],




  body:

  results.map(

    (item)=>

    [

      item[0],

      formatCurrency(item[1])

    ]

  ),




  headStyles:{


    fillColor:[

      22,

      101,

      52

    ],


    textColor:255,


    halign:"center"


  },




  bodyStyles:{


    fontSize:12


  },




  didParseCell:(data)=>{



    if(

      data.section==="body"

      &&

      results[
        data.row.index
      ][0].includes("Total")

    ){



      data.cell.styles.fillColor =

      [

        255,

        235,

        59

      ];



      data.cell.styles.fontStyle =

      "bold";


    }



  }



});
// =========================
// BANK RATE PDF COMPARISON TABLE
// =========================


let bankYear = "";
let bankProfit = 0;



if(plan === "Elegance"){

  bankYear = "1 Year (11%)";

  bankProfit = bankComparison(1);

}



if(plan === "Wisdom Plus"){

  bankYear = "3 Years (11%)";

  bankProfit = bankComparison(3);

}



if(plan === "Golden Harvest"){

  bankYear = "5 Years (11%)";

  bankProfit = bankComparison(5);

}




const extraBenefit =

  getTotalHarvestAmount() -
  bankProfit;








autoTable(doc,{



  startY:

  doc.lastAutoTable.finalY + 15,





  head:[

    [

      "Duration",

      "Bank Profit",

      "Your Plan Profit",

      "Extra Benefit"

    ]

  ],





  body:[

    [

      bankYear,

      formatCurrency(bankProfit),

      formatCurrency(
        getTotalHarvestAmount()
      ),

      formatCurrency(
        extraBenefit
      )

    ]

  ],





  headStyles:{


    fillColor:[

      30,

      64,

      175

    ],


    textColor:255,


    halign:"center"


  },





  bodyStyles:{


    fontSize:12


  },





  didParseCell:(data)=>{


    if(

      data.section === "body"

      &&

      data.column.index === 3

    ){



      data.cell.styles.fillColor = [

        220,

        252,

        231

      ];



      data.cell.styles.fontStyle =

      "bold";


    }



  }




});
doc.save(


  `${plan.replace(

    /\s+/g,

    "_"

  )}_Report.pdf`


);



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









      {/* PLAN & AMOUNT INPUT */}



      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      ">




        {/* PLAN SELECT */}


        <div>


          <label className="
            font-bold
            text-xl
          ">


            Select Plan


          </label>





          <select


            value={plan}



            onChange={(e)=>{


              setPlan(
                e.target.value
              );


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



            <option value="Elegance">

              Elegance

            </option>




            <option value="Wisdom Plus">

              Wisdom Plus

            </option>





            <option value="Golden Harvest">

              Golden Harvest

            </option>



          </select>




        </div>









        {/* CONTRIBUTION INPUT */}



        <div className="
          md:col-span-2
        ">



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

              planDetails[plan]
              .minimum
              .toLocaleString()

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













      {/* ERROR MESSAGE */}



      {

        error &&



        <p className="
          text-red-600
          font-bold
          mt-5
          text-lg
        ">


          {error}


        </p>


      }













      {/* INVESTMENT RESULT TABLE */}



      {


        results.length > 0

        &&

        !error

        &&




        <table className="
          w-full
          mt-10
          rounded-3xl
          overflow-hidden
          shadow-xl
        ">



          <tbody>



            {


              results.map(

                (item,index)=>(



                  <tr


                    key={index}




                    className={


                      item[0]
                      .includes("Total")


                      ?


                      "bg-yellow-400"


                      :


                      "bg-green-50"



                    }



                  >






                    <td className="
                      p-5
                      font-semibold
                      text-lg
                    ">



                      {item[0]}



                    </td>








                    <td className="
                      p-5
                      text-right
                      font-bold
                      text-green-900
                      text-lg
                    ">



                      Rs. {formatCurrency(item[1])}



                    </td>





                  </tr>



                )

              )



            }



          </tbody>




        </table>



      }












      {/* BANK RATE COMPARISON */}





      {


        results.length > 0

        &&

        !error

        &&



        <BankRate
  amount={amount}
  plan={plan}
  investmentReturn={getTotalHarvestAmount()}
/>

      }







      {/* DOWNLOAD PDF BUTTON */}



      {


        results.length > 0

        &&

        !error

        &&




        <div className="
          mt-8
          flex
          justify-center
        ">




          <button



            onClick={generatePDF}



            className="
              bg-green-700
              hover:bg-green-800
              text-white
              px-10
              py-5
              rounded-2xl
              text-xl
              font-bold
              shadow-xl
              transition
            "



          >



            📄 Download PDF



          </button>





        </div>




      }









    </div>





  </div>





);




};







export default InvestmentCalculator;