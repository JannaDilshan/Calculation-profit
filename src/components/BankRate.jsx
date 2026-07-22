import React from "react";

const BankRate = ({ amount, plan, investmentReturn }) => {

  const investment = Number(
    amount.replace(/,/g, "")
  );


  const BANK_RATE = 0.11; // 11%


  const calculateBankReturn = (years) => {

    return Math.round(
      investment *
      BANK_RATE *
      years
    );

  };


  let bankResult = null;


  if(plan === "Elegance"){

    bankResult = {
      year:"1 Year",
      interest:calculateBankReturn(1)
    };

  }


  if(plan === "Wisdom Plus"){

    bankResult = {
      year:"3 Years",
      interest:calculateBankReturn(3)
    };

  }


  if(plan === "Golden Harvest"){

    bankResult = {
      year:"5 Years",
      interest:calculateBankReturn(5)
    };

  }


  if(!investment || !bankResult) return null;



  const extraBenefit =
    investmentReturn -
    bankResult.interest;



  return (

    <div className="
      mt-10
      bg-blue-50
      rounded-3xl
      p-4
      sm:p-8
      shadow-xl
      overflow-hidden
    ">



      <h2 className="
        text-xl
        sm:text-3xl
        font-bold
        text-blue-900
        text-center
        mb-6
      ">

        🏦 Bank Fixed Deposit Comparison

        <br/>

        <span className="
          text-sm
          sm:text-lg
          text-blue-700
        ">

          Bank Interest Rate : 11% Per Year

        </span>

      </h2>





      {/* Responsive Table */}

      <div className="
        overflow-x-auto
        rounded-xl
      ">


        <table className="
          min-w-[700px]
          w-full
        ">



          <thead>

            <tr className="
              bg-blue-700
              text-white
            ">


              <th className="
                p-3
                sm:p-4
                text-sm
                sm:text-base
              ">

                Duration

              </th>



              <th className="
                p-3
                sm:p-4
                text-sm
                sm:text-base
              ">

                Bank Profit

              </th>



              <th className="
                p-3
                sm:p-4
                text-sm
                sm:text-base
              ">

                Your Plan Profit

              </th>



              <th className="
                p-3
                sm:p-4
                text-sm
                sm:text-base
              ">

                Extra Benefit

              </th>


            </tr>


          </thead>





          <tbody>


            <tr className="
              bg-white
              border-b
            ">


              <td className="
                p-3
                sm:p-4
                font-bold
              ">

                {bankResult.year}

              </td>



              <td className="
                p-3
                sm:p-4
                text-right
                font-bold
                text-blue-900
              ">

                Rs. {bankResult.interest.toLocaleString()}

              </td>




              <td className="
                p-3
                sm:p-4
                text-right
                font-bold
                text-green-700
              ">

                Rs. {investmentReturn.toLocaleString()}

              </td>





              <td className="
                p-3
                sm:p-4
                text-right
                font-bold
                bg-green-100
                text-green-700
              ">

                Rs. {extraBenefit.toLocaleString()}

              </td>


            </tr>


          </tbody>


        </table>


      </div>









      <div className="
        mt-8
        bg-green-100
        rounded-2xl
        p-4
        sm:p-6
        text-center
      ">



        <h3 className="
          text-xl
          sm:text-2xl
          font-bold
          text-green-900
        ">

          🌿 Advantage

        </h3>





        <p className="
          mt-4
          text-base
          sm:text-xl
          font-bold
        ">


          Selected Plan:

          <span className="
            text-green-700
          ">

            {" "}{plan}

          </span>


        </p>






        <p className="
          mt-3
          text-base
          sm:text-xl
          font-bold
        ">


          Your Total Amount at Harvest:


          <span className="
            text-green-700
          ">

            {" "}
            Rs. {investmentReturn.toLocaleString()}

          </span>


        </p>







        <p className="
          mt-3
          text-base
          sm:text-xl
          font-bold
        ">


          Extra Benefit Compared to Bank:


          <span className="
            text-green-700
          ">


            {" "}
            Rs. {extraBenefit.toLocaleString()}


          </span>


        </p>




      </div>



    </div>

  );

};


export default BankRate;