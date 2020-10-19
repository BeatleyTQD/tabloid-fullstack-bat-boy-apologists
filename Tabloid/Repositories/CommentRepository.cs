using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetCommentsForPost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id AS CommentId, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime AS CommentCreate,
                                               u.Id AS UserId, u.FirebaseUserId, u.DisplayName, u.FirstName, u.LastName, u.Email, u.CreateDateTime AS UserCreate, u.ImageLocation, u.UserTypeId AS UserType, u.IsDeactivated,
                                               ut.Id AS UserTypeId, ut.Name AS UserTypeName
                                          FROM comment c
                                          JOIN UserProfile u ON c.UserProfileId = u.Id
                                          JOIN UserType ut ON u.UserTypeId = ut.Id
                                         WHERE c.PostId = @postId
                                      ORDER BY c.CreateDateTime DESC";

                    cmd.Parameters.AddWithValue("@postId", postId);
                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CommentCreate")),
                            User = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("UserCreate")),
                                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                                UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                IsDeactivated = reader.GetInt32(reader.GetOrdinal("IsDeactivated")),
                                UserType = new UserType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                }
                            }

                        });
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      INSERT 
                        INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime)
                      VALUES (@PostId, @UserProfileId, @Subject, @Content, @CreateDateTime)";

                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteComment(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Comment WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id AS CommentId, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime AS CommentCreate,
                                               u.Id AS UserId, u.FirebaseUserId, u.DisplayName, u.FirstName, u.LastName, u.Email, u.CreateDateTime AS UserCreate, u.ImageLocation, u.UserTypeId AS UserType, u.IsDeactivated,
                                               ut.Id AS UserTypeId, ut.Name AS UserTypeName
                                          FROM comment c
                                          JOIN UserProfile u ON c.UserProfileId = u.Id
                                          JOIN UserType ut ON u.UserTypeId = ut.Id
                                         WHERE c.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CommentCreate")),
                            User = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("UserCreate")),
                                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                                UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                IsDeactivated = reader.GetInt32(reader.GetOrdinal("IsDeactivated")),
                                UserType = new UserType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                }
                            }
                        };
                        reader.Close();
                        return comment;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
    }
}
