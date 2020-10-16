using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration config) : base(config) { }
        public List<Subscription> GetAllSubscribedIds(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, SubscriberUserProfileId, ProviderUserProfileId FROM Subscription " +
                        "WHERE SubscriberUserProfileId = @userId And BeginDateTime <= GETDATE() AND EndDateTime IS NULL";

                    cmd.Parameters.AddWithValue("@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var subscriptions = new List<Subscription>();

                    while (reader.Read())
                    {
                        subscriptions.Add(new Subscription()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            SubscriberUserProfileId = reader.GetInt32(reader.GetOrdinal("SubscriberUserProfileId")),
                            ProviderUserProfileId = reader.GetInt32(reader.GetOrdinal("ProviderUserProfileId"))
                        });
                    }

                    reader.Close();

                    return subscriptions;
                }
            }
        }

        public void AddSubscription(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Subscription (SubscriberUserProfileId,ProviderUserProfileId,BeginDateTime) 
                    OUTPUT INSERTED.ID
                    VALUES (@subscriberUserProfileId,@providerUserProfileId,GetDate());
                    ";

                    cmd.Parameters.AddWithValue("@subscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@providerUserProfileId", subscription.ProviderUserProfileId);


                    int newlyCreatedSubscriptionId = (int)cmd.ExecuteScalar();

                    subscription.Id = newlyCreatedSubscriptionId;
                }
            }
        }

        public void DeleteAllSubscriptionsBySubscribedUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     DELETE FROM Subscription Where subscriberUserProfileId = @userId;
                        ";
                    cmd.Parameters.AddWithValue("@userId", userId);



                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteAllSubscriptionsByProviderUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     DELETE FROM Subscription Where ProviderUserProfileId = @userId;
                        ";
                    cmd.Parameters.AddWithValue("@userId", userId);



                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeactivateSubscription(Subscription subscription)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Subscription
                            SET 
                                [EndDateTime] = GetDate()
                            WHERE SubscriberUserProfileId = @subscriberUserProfileId 
                            AND ProviderUserProfileId = providerUserProfileId;";

                    cmd.Parameters.AddWithValue("@subscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@providerUserProfileId", subscription.ProviderUserProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
