
using System;
using System.IO;
using System.Net;
using System.Text;

//public enum HttpVerb
//{
//    GET,
//    POST,
//    PUT,
//    DELETE
//}

namespace HttpUtils.APIM
{
    public class RestClient
    {
        public string EndPoint { get; set; }
        public HttpVerb Method { get; set; }
        public string ContentType { get; set; }
        public string PostData { get; set; }

        public NOAHAPIConnectResponse responseData = new NOAHAPIConnectResponse();

        public HttpWebRequest Request { get; set; }
        public HttpWebResponse Reponse { get; set; }
        // public NOAHAPIConenctAuth auth { get; set; }

        public RestClient()
        {
            EndPoint = "https://noahapplication.com/";
            Method = HttpVerb.GET;
            ContentType = "text/xml";
            PostData = "";
            Request = (HttpWebRequest)WebRequest.Create(EndPoint);
        }
        public RestClient(string endpoint)
        {
            EndPoint = endpoint;
            Method = HttpVerb.GET;
            ContentType = "text/xml";
            PostData = "";
            Request = (HttpWebRequest)WebRequest.Create(EndPoint);
        }
        public RestClient(string endpoint, HttpVerb method)
        {
            EndPoint = endpoint;
            Method = method;
            ContentType = "text/xml";
            PostData = "";
            Request = (HttpWebRequest)WebRequest.Create(EndPoint);
        }

        public RestClient(string endpoint, HttpVerb method, string postData)
        {
            EndPoint = endpoint;
            Method = method;
            ContentType = "text/xml";
            PostData = postData;
            Request = (HttpWebRequest)WebRequest.Create(EndPoint);
        }


        public string MakeRequest()
        {
            return MakeRequest("");
        }

        private string MakeRequest(string parameters)
        {
            var request = (HttpWebRequest)WebRequest.Create(EndPoint + parameters);

            
            //FLI Hardcode
            string username = "fpti";
            string password = "Dcod@2022";
            System.Net.CredentialCache credentialCache = new System.Net.CredentialCache();
            credentialCache.Add(
                new System.Uri(EndPoint),
                "Basic",
                new System.Net.NetworkCredential(username, password)
            );
            request.Credentials = credentialCache;


         
            try
            {
                if (Request.Headers != null)
                    request.Headers = Request.Headers;
            }
            catch { }

            request.Method = Method.ToString();
            request.ContentLength = 0;
            request.ContentType = ContentType;

            if (!string.IsNullOrEmpty(PostData) && Method == HttpVerb.POST)
            {
                var encoding = new UTF8Encoding();
                var bytes = Encoding.GetEncoding("iso-8859-1").GetBytes(PostData);
                request.ContentLength = bytes.Length;

                using (var writeStream = request.GetRequestStream())
                {
                    writeStream.Write(bytes, 0, bytes.Length);
                }
            }

            using (var response = (HttpWebResponse)request.GetResponse())
            {
                var responseValue = string.Empty;

                
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    responseData.header = response.Headers.ToString();
                    responseData.status = 400;
                    var message = String.Format("Request failed. Received HTTP {0}", response.StatusCode);
                    throw new ApplicationException(message);
                }

                // grab the response
                using (var responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                        using (var reader = new StreamReader(responseStream))
                        {
                            responseValue = reader.ReadToEnd();
                        }
                }

                responseData.header = response.Headers.ToString();
                responseData.body = responseValue;
                responseData.status = 200;

                //try
                //{
                //    bool noahsuccess = NoahWebLib.Parser.ParseBool(response.Headers["noahsuccess"].ToString());
                //    if(noahsuccess == false) responseData.status = 400;
                //}
                //catch { }
                

                return responseValue;
            }
        }

    } // class
    public class NOAHAPIConnectResponse
    {
        public int status = 400;
        public string header = "";
        public string body = "";
    }
}